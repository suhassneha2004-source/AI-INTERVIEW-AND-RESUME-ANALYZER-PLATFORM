function DashboardCard({ title, children }) {

  return (

    <div className="bg-white shadow-xl rounded-2xl p-6 mb-6">

      {/* Card Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h2>

      {/* Card Content */}
      <div>
        {children}
      </div>

    </div>
  );
}

export default DashboardCard;