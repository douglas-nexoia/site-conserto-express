const brands = [
  "Brastemp",
  "Electrolux",
  "Consul",
  "Samsung",
  "LG",
  "Panasonic",
  "IBBL",
  "Latina",
  "Esmaltec",
  "Metalfrio",
];

const Brands = () => {
  return (
    <section className="bg-[#07111D] border-y border-white/10 py-6 overflow-hidden">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="font-mono text-xs text-white/50 uppercase tracking-widest whitespace-nowrap">
            Marcas atendidas:
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base font-heading font-semibold text-white/75">
            {brands.map((b, i) => (
              <span key={i} className="hover:text-white transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
