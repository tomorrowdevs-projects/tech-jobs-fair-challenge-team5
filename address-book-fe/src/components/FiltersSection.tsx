function FiltersSection() {
  return (
    <div className="lg:flex hidden w-[200px] shadow-md rounded-sm flex-col items-center gap-4 bg-white p-2">
      <p className="text-sm font-arimo font-bold text-primary">Filter by</p>
      <select id="type" className="border-2 border-black rounded-sm w-full">
        <option value="1">clients</option>
        <option value="2">employees</option>
        <option value="3">suppliers</option>
      </select>
      <select id="type" className="border-2 border-black rounded-sm w-full">
        <option value="1">clients</option>
        <option value="2">employees</option>
        <option value="3">suppliers</option>
      </select>
      <select id="type" className="border-2 border-black rounded-sm w-full">
        <option value="1">clients</option>
        <option value="2">employees</option>
        <option value="3">suppliers</option>
      </select>
    </div>
  );
}

export default FiltersSection;
