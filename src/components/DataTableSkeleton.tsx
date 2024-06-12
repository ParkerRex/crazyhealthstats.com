import React from "react";

const DataTableSkeleton = () => {
	return (
		<div className="rounded-md border w-full">
			<table className="w-full">
				<thead>
					<tr>
						{Array.from({ length: 5 }).map((_, index) => (
							<th key={index} className="p-4">
								<div className="h-4 bg-gray-200 rounded w-full"></div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 10 }).map((_, index) => (
						<tr key={index}>
							{Array.from({ length: 5 }).map((_, index) => (
								<td key={index} className="p-4">
									<div className="h-4 bg-gray-200 rounded w-full"></div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="h-8 w-20 bg-gray-200 rounded"></div>
				<div className="h-8 w-20 bg-gray-200 rounded"></div>
			</div>
		</div>
	);
};

export default DataTableSkeleton;
