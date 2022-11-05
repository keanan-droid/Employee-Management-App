import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { Employee } from './Employee';

export const ListEmployees = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchData = async ()=> {
        setIsLoading(true)
      try {
        const response = await EmployeeService.getEmployee();
        setEmployees(response.data);

      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    };
    fetchData();
  },[]);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res => {
      if (employees) {
        setEmployees((prevElement)=> {
          return prevElement.filter((employee) => employee.id !== id)
        });
      };
    }));
  };

  return (
    <div className="container mx-auto my-8">
      <div className='h-12'>
        <button onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py font-semibold">
            Add Employee
        </button>
      </div>
        <div className='flex shadow border-b'>
          <table>
            <thead className='min-w-full'>
              <tr>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>FirstName</th>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>LastName</th>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Email</th>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Actions</th>
              </tr>
            </thead>
              {!isLoading && (
                <tbody className='bg-white'>
              {employees.map((employee) =>(
                <Employee
                employee={employee}
                deleteEmployee={deleteEmployee}
                key={employee.id}></Employee>
              ))}
            </tbody>
            )}
          </table>
        </div>
    </div>
  )
}
