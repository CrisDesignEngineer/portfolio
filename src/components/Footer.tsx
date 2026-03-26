export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-text-muted text-[13px]">
            Disponível para novos projetos
          </p>
        </div>
        <p className="text-text-muted text-[13px]">
          &copy; {new Date().getFullYear()} Cristiano Carvalho
        </p>
      </div>
    </footer>
  );
}
