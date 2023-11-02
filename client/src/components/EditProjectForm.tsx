import { useState } from "react";
import { FormValueType } from "./AddProjectModal";
import { ClientType } from "./Clients";
import { PROJECT_TYPE } from "./Projects";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";

interface PROPS_PROJECT_TYPE extends PROJECT_TYPE {
  description: string;
  client: ClientType;
}

type PROPS = {
  project: PROPS_PROJECT_TYPE;
};

type FormType = Pick<FormValueType, "name" | "description" | "status">;

export default function EditProjectForm({ project }: PROPS) {
  const [formValue, setFormValue] = useState<FormType>({
    name: project.name,
    description: project.description,
    status: "",
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: formValue.name,
      description: formValue.description,
      status: formValue.status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formValue).filter((item) => item !== "").length === 0)
      return alert("Please fill in all fields");

    updateProject().catch(() => alert("Add Project Fail"));
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formValue.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formValue.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={formValue.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormValue((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="new">Not Started</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
