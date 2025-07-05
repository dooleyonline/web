import { User } from "../api/shared";

export default function getInitial({ firstName, lastName }: User): string {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}
