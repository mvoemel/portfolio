import dayjs from "dayjs";
import { navIcons, navLinks } from "@/lib/constants";
import { useWindowStore } from "@/stores/window-store";
import { useFinderStore } from "@/stores/finder-store";

export function Navbar() {
  const {} = useFinderStore();
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Michael's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd D MMM H:mm")}</time>
      </div>
    </nav>
  );
}
