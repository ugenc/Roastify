import type { PersonaId } from "@/lib/review";
export function Avatar({ id, size = 48 }: { id: PersonaId; size?: number }) {
  const colors = {
    maya: "#D5C5FF",
    leo: "#FFE45C",
    priya: "#FFB3A3",
    sam: "#9DE8CE",
    alex: "#A8D6FF",
  };
  const skin = {
    maya: "#D99365",
    leo: "#F3BC95",
    priya: "#AA6549",
    sam: "#F2BD9A",
    alex: "#BD8462",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className="avatar"
    >
      <rect width="80" height="80" rx="40" fill={colors[id]} />
      <path
        d="M9 80c2-18 14-26 31-26s29 8 31 26"
        fill={
          id === "maya"
            ? "#6941F5"
            : id === "leo"
              ? "#FAFAFF"
              : id === "priya"
                ? "#8E2845"
                : id === "sam"
                  ? "#186A57"
                  : "#315DC3"
        }
      />
      {(id === "maya" || id === "priya") && (
        <path d="M17 51V30c0-31 48-30 47 2v26H17" fill="#292336" />
      )}
      <path d="M33 50h14v14c-5 7-10 7-14 0V50" fill={skin[id]} />
      <ellipse cx="40" cy="35" rx="19" ry="23" fill={skin[id]} />
      <path
        d="M20 32C14 7 46 3 58 20l3 16-8-10c-13 1-19-6-21-9-1 8-8 10-12 15"
        fill={id === "sam" ? "#C16B3D" : id === "alex" ? "#463325" : "#292336"}
      />
      {id === "leo" && (
        <>
          <path d="M18 23c0-17 40-19 45 3H18" fill="#6941F5" />
          <path
            d="M15 26h51"
            stroke="#432589"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {id === "sam" && (
        <>
          <rect
            x="24"
            y="31"
            width="13"
            height="10"
            rx="4"
            stroke="#202033"
            strokeWidth="2.5"
          />
          <rect
            x="43"
            y="31"
            width="13"
            height="10"
            rx="4"
            stroke="#202033"
            strokeWidth="2.5"
          />
          <path d="M37 35h6" stroke="#202033" strokeWidth="2" />
        </>
      )}
      {id !== "sam" && (
        <>
          <circle cx="32" cy="35" r="2" fill="#202033" />
          <circle cx="48" cy="35" r="2" fill="#202033" />
        </>
      )}
      <path
        d="M35 47c3 3 7 3 10-1"
        stroke="#542C27"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {id === "priya" && (
        <>
          <circle cx="21" cy="43" r="3" fill="#FFE45C" />
          <circle cx="60" cy="43" r="3" fill="#FFE45C" />
        </>
      )}
      {id === "alex" && (
        <path d="M25 47c3 18 26 18 30-1-7 9-21 8-30 1" fill="#463325" />
      )}
    </svg>
  );
}
