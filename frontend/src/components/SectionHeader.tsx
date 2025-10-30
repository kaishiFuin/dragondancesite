import { PropsWithChildren } from "react";

interface Props {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description, children }: PropsWithChildren<Props>) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-brand">{title}</h2>
        {description ? <p className="text-brand/60">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
