export default function AdminRoot() {
	// Redirect to /admin (the inner admin area) or show a small landing
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Admin</h1>
			<p className="text-gray-600">Use the sidebar to navigate the admin area.</p>
		</div>
	);
}
