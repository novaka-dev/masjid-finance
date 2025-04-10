import { checkUser } from "@/lib/checkUser";
import Header from "./header";

const HeaderWrapper = async () => {
  const user = await checkUser();
  const role = user?.role ?? "USER";

  return <Header role={role} />;
};

export default HeaderWrapper;
