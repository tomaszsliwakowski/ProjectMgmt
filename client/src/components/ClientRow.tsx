import { ClientType } from "./Clients";
import { FaTrash } from "react-icons/fa";

type PROPS = {
  client: ClientType;
};

export default function ClientRow({ client }: PROPS) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
