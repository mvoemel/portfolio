import { useState } from "react";
import { CopyIcon, CheckIcon, PhoneIcon, User2Icon } from "lucide-react";

import { contactCards } from "@/lib/constants";
import type { ContactCard } from "@/lib/types";
import { cn } from "@/lib/util";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";

function Contact() {
  const [selectedContact, setSelectedContact] = useState<ContactCard>(
    contactCards[0],
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    if (!selectedContact.email) return;
    navigator.clipboard.writeText(selectedContact.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-bg-secondary text-text-primary">
      <div className="window-header shrink-0 h-12 flex items-center bg-bg-tertiary backdrop-blur-md">
        <WindowControls target="contacts" />
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-text-secondary">
          Contact Me
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 min-w-50 max-w-75 backdrop-blur-sm overflow-y-auto pt-2">
          {contactCards.map((contact) => (
            <button
              key={contact.name}
              onClick={() => setSelectedContact(contact)}
              className={cn(
                "w-[calc(100%-16px)] mx-2 flex items-center gap-3 p-2 rounded-lg transition-colors text-left",
                selectedContact.name === contact.name
                  ? "bg-primary text-white"
                  : "hover:bg-bg-tertiary",
              )}
            >
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden shrink-0">
                {contact.profilePicture && (
                  <img
                    src={contact.profilePicture}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                  />
                )}
                {!contact.profilePicture && (
                  <User2Icon className="text-text-secondary w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold truncate text-sm">
                  {contact.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto bg-bg-primary p-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <div className="w-40 h-40 rounded-3xl bg-white shadow-sm overflow-hidden border border-black/5 dark:border-white/5">
              {selectedContact.profilePicture && (
                <img
                  src={selectedContact.profilePicture}
                  alt={selectedContact.name}
                  className="w-full h-full object-cover"
                />
              )}
              {!selectedContact.profilePicture && (
                <User2Icon className="text-text-secondary w-full h-full object-cover" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-center">
              {selectedContact.name}
            </h1>

            <div className="w-full bg-bg-secondary/50 rounded-lg p-5 space-y-6 backdrop-blur-sm">
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-text-tertiary">
                    Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    title="Copy email"
                  >
                    {isCopied ? (
                      <CheckIcon size={14} className="text-green-500" />
                    ) : (
                      <CopyIcon size={14} />
                    )}
                  </button>
                </div>
                <div className="text-lg text-text-primary break-all">
                  {selectedContact.email}
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-text-tertiary">
                    Phone
                  </span>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-text-tertiary hover:text-text-primary transition-colors"
                    title="Call phone"
                  >
                    <PhoneIcon size={14} />
                  </a>
                </div>
                <div className="text-lg text-text-primary break-all">
                  {selectedContact.phone}
                </div>
              </div>

              {selectedContact.github && (
                <div>
                  <div className="text-sm font-medium text-text-tertiary mb-1">
                    Github
                  </div>
                  <a
                    href={selectedContact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-500 hover:underline break-all"
                  >
                    {selectedContact.github.replace("https://", "")}
                  </a>
                </div>
              )}

              {selectedContact.linkedin && (
                <div>
                  <div className="text-sm font-medium text-text-tertiary mb-1">
                    LinkedIn
                  </div>
                  <a
                    href={selectedContact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-500 hover:underline break-all"
                  >
                    {selectedContact.linkedin.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ContactWindow = WindowWrapper(
  Contact,
  "contacts",
  "w-[50rem] h-[36rem] absolute left-[15vw] top-[15vh] bg-bg-primary rounded-lg shadow-2xl drop-shadow-2xl overflow-hidden",
);
