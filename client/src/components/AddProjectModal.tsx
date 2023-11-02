import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ClientType } from "./Clients";
import { ADD_PROJECT } from "../mutations/projectMutations";

export type FormValueType = {
  name: string;
  description: string;
  clientId: string;
  status: string;
};

export default function AddProjectModal() {
  const [formValue, setFormValue] = useState<FormValueType>({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: formValue.name,
      description: formValue.description,
      clientId: formValue.clientId,
      status: formValue.status,
    },
    update(cache, { data: { addProject } }) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECT });
      cache.writeQuery({
        query: GET_PROJECT,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formValue).filter((item) => item !== "").length === 0)
      return alert("Please fill in all fields");

    addProject()
      .then(() => {
        setFormValue({
          name: "",
          description: "",
          clientId: "",
          status: "new",
        });
      })
      .catch(() => alert("Add Project Fail"));
  };

  if (loading) return null;
  if (error) return `Something Went Wrong`;

  return (
    <>
      {!loading && !error ? (
        <>
          <button
            type="button"
            className="btn btn-primary "
            data-bs-toggle="modal"
            data-bs-target="#exampleModalProject"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon me-2" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="exampleModalProject"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabelProject"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabelProject">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true"></span>
                  </button>
                </div>
                <div className="modal-body">
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
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        value={formValue.clientId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setFormValue((prev) => ({
                            ...prev,
                            clientId: e.target.value,
                          }))
                        }
                        className="form-select"
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((item: ClientType) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
