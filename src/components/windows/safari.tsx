import { blogPosts } from "@/lib/constants";
import { WindowWrapper } from "../window-wrapper";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  MoveRightIcon,
  PanelLeftIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  ShieldHalf,
} from "lucide-react";
import { WindowControls } from "../window-controls";

function Safari() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
        <PanelLeftIcon className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeftIcon className="icon" />
          <ChevronRightIcon className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search">
            <SearchIcon className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <ShareIcon className="icon" />
          <PlusIcon className="icon" />
          <CopyIcon className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>

              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Check out my blog post{" "}
                  <MoveRightIcon className="icon-hover" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const SafariWindow = WindowWrapper(Safari, "safari");
