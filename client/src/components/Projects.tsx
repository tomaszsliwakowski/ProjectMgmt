import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export interface PROJECT_TYPE {
  id: string;
  name: string;
  status: string;
}

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECT);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row">
          {data.projects.map((item: PROJECT_TYPE) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
