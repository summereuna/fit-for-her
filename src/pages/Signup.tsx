import { useCreateUser } from "@/api/userApi";
import SignForm from "@/components/SignForm";
import { SignupUsersRequest } from "@/types/user.types";

export default function Signup() {
  const { mutateCreateUser, isError, errorMessage } = useCreateUser();

  const handleSignup = (newUser: SignupUsersRequest) => {
    mutateCreateUser(newUser);
  };
  return (
    <div>
      <SignForm
        onSignup={handleSignup}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}
