import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ClientType } from "./Clients";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

type FormValueType = Pick<ClientType, "name" | "email" | "phone">;

export default function AddClientModal() {
  const [formValue, setFormValue] = useState<FormValueType>({
    name: "",
    email: "",
    phone: "",
  });
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients }: any = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formValue).filter((item) => item !== "").length === 0)
      return alert("Please fill in all fields");

    addClient()
      .then(() => {
        setFormValue({ name: "", email: "", phone: "" });
      })
      .catch(() => alert("Add Client Fail"));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon me-2" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formValue.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValue((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formValue.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValue((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
