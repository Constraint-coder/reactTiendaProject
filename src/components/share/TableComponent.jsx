import React from "react";
import { PaginationComponent } from "./PaginationComponent";

export function TableComponent({ headers = [], items = [], actions = [] }) {
  return (
   <>
   <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
              >
                {header.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 border-b w-1 whitespace-nowrap">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {items.length > 0 ? (
            items.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-600 border-b"
                  >
                    {header.render
                      ? header.render(item)
                      : item[header.key]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="px-4 py-2 border-b w-1 whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      {actions.map((action, index) => {
                        const actionLabel = typeof action.label === 'function' ? action.label(item) : action.label;
                        const actionIcon = typeof action.icon === 'function' ? action.icon(item) : action.icon;
                        const actionClass = typeof action.className === 'function' ? action.className(item) : action.className;
                        return (
                        <button
                          key={index}
                          onClick={() => action.onClick(item)}
                          className={`px-3 py-1 rounded text-xs text-white flex items-center gap-1.5 ${actionClass}`}
                        >
                          {actionIcon && <span>{actionIcon}</span>}
                          <span>{actionLabel}</span>
                        </button>
                      )})}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + (actions.length > 0 ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
   </>
  );
};