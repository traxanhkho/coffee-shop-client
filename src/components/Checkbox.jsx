import React, { useEffect } from "react";
import useStore from "../store";

function Checkbox({ items, types }) {
  const setTypes = useStore((store) => store.setTypes);

  const attach = (typeId) => {
    if (!types) {
      const index = items.findIndex((item) => item.id === typeId);
      if (index !== -1) {
        // Create a copy of the types array
        const newTypes = [...items];
        // Add the isDetach property to the found item
        newTypes[index] = { ...newTypes[index], isAttach: true };
        console.log(`Attach item with id ${typeId}`);
        console.log(newTypes);
        setTypes(newTypes);
        // Now `newTypes` contains the item with the isDetach property added
      } else {
        console.log(`Item with id ${typeId} not found`);
      }
    }
  };

  const detach = (typeId) => {
    if (!types) {
      const index = items.findIndex((item) => item.id === typeId);
      if (index !== -1) {
        // Create a copy of the types array
        const newTypes = [...items];
        // Add the isDetach property to the found item
        newTypes[index] = { ...newTypes[index], isAttach: false };
        console.log(`Detached item with id ${typeId}`);
        console.log(newTypes);
        setTypes(newTypes);

        // Now `newTypes` contains the item with the isDetach property added
      } else {
        console.log(`Item with id ${typeId} not found`);
      }
    }
  };

  function resetTypes() {
    const typeReset = items.map((type) => ({ ...type, isAttach: false }));
    setTypes(typeReset);
  }
  useEffect(() => {
    return () => {
      resetTypes();
    };
  }, []);

  return (
    <div class="p-6 text-gray-900 dark:text-gray-100">
      <div class="bg-white overflow-auto">
        <table class="bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Options
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Id
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Attach
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Detach
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {items.map((item) => (
              <tr>
                <td class="text-left py-3 px-4">
                  {!types ? (
                    <input
                      type="checkbox"
                      name=""
                      className="w-6 label:bg-red-400 "
                      id=""
                      checked={item.isAttach}
                      disabled
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className="w-6 label:bg-red-400"
                      disabled
                      checked={types.map((type) => {
                        if (type.id == item.id || item.isAttach) return "true";

                        return "false";
                      })}
                    />
                  )}
                </td>
                <td class="text-left py-3 px-4">{item.id}</td>
                <td class="text-left py-3 px-4">{item.name}</td>

                <td class="text-left py-3 px-4">
                  <button
                    onClick={() => attach(item.id)}
                    disabled={item.isAttach ? true : false}
                    className={`disabled:opacity-70 disabled:text-white btn px-2 py-1  rounded-lg hover:text-[--primary] hover:opacity-70 bg-yellow-200`}
                  >
                    Attach
                  </button>
                </td>
                <td class="text-left py-3 px-4">
                  <button
                    disabled={item.isAttach ? false : true}
                    onClick={() => detach(item.id)}
                    className="disabled:opacity-70 disabled:text-white btn px-2 py-1 rounded-lg hover:text-[--primary]  hover:opacity-70 bg-red-200"
                  >
                    Detach
                  </button>
                </td>
              </tr>
            ))}

            {/* @endforeach */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Checkbox;

{
  /* <td class="text-left py-3 px-4">
                            {!! Form::open(['method' => 'PUT' , 'route' => ['admin.user.attach' , $user]])!!}
                            {!! Form::hidden('role' , $role->id)!!}
                            {!! Form::submit('Attach',['class' => "btn px-2 py-1 rounded-lg hover:text-white bg-yellow-200"]) !!}
                            {!! Form::close() !!}
                        <td class="text-left py-3 px-4">
                        {!! Form::open(['method' => 'PUT' , 'route' => ['admin.user.detach' , $user]])!!}
                            {!! Form::hidden('role' , $role->id)!!}
                            {!! Form::submit('Detach',['class' => "btn px-2 py-1 rounded-lg hover:text-white bg-red-200"]) !!}
                            {!! Form::close() !!}
                        </td> */
}
