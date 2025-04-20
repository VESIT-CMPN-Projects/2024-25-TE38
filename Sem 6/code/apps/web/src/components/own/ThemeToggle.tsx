import useThemeStore from "@/store/store";
import { Button } from "../ui/button";
import { MdDarkMode } from "react-icons/md";

export default function ToggleTheme({ style }: any) {
  const { darkMode, toggleDarkMode }: any = useThemeStore();
  return (
    <Button onClick={toggleDarkMode} className={style}>
      <MdDarkMode />
    </Button>
  );
}
