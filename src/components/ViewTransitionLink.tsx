import { useNavigate } from "react-router-dom";
import { withViewTransition } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ViewTransitionLink({ to, children, className, onClick }: Props) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        withViewTransition(() => {
          navigate(to);
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        });
      }}
    >
      {children}
    </a>
  );
}
