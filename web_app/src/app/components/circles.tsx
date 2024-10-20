const Circles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
          <div className="absolute inset-4 rounded-full border border-white/10"></div>
          <div className="absolute inset-8 rounded-full border border-white/10"></div>
          <div className="absolute inset-12 rounded-full border border-white/10"></div>
          <div className="absolute inset-16 rounded-full border border-white/20"></div>
        </div>
  );
}


export default Circles;
