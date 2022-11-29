import Logo from "../../assets/logo.svg";

interface Props {}

const Header = (props: Props) => {
  return (
    <header className="mb-4 flex w-full justify-between rounded-xl bg-primary p-5 shadow">
      <div className="text-white">
        <span className="mb-2 block text-sm">My balance</span>
        <span className="block text-2xl font-bold tracking-wide">
          ${921.48}
        </span>
      </div>
      <img src={Logo} alt="Logo" width={72} height={48} />
    </header>
  );
};

export default Header;
