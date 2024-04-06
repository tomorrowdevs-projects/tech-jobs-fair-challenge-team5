import { Type } from "../types";

interface Props {
  types: Type[]
}

const FiltersSection = ({ types }: Props) => {
  return (
    <div className="lg:flex hidden w-[200px] shadow-md rounded-sm flex-col items-center gap-4 bg-white p-2 h-full">
      <p className="text-sm font-arimo font-bold text-primary">Filter by</p>
      <div className="flex flex-col gap-1 w-full">
        <p className="font-arimo text-sm text-primary">Type</p>
        <select id="type" className="rounded-sm shadow-md w-full p-2 font-arimo">
          <option value="Select a type ..." >Select a type ...</option>
          {types?.map((t) => {
            return <option key={t.id} value={t.id}>{t.name}</option>
          })}
        </select>
      </div>
    </div>
  );
}

export default FiltersSection;
