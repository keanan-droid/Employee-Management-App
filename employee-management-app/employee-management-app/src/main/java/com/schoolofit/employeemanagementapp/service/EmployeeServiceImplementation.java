package com.schoolofit.employeemanagementapp.service;

import com.schoolofit.employeemanagementapp.controller.Employee;
import com.schoolofit.employeemanagementapp.entity.EmployeeEntity;
import com.schoolofit.employeemanagementapp.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService{

    private final EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
       List<EmployeeEntity> employeeEntities = employeeRepository.findAll();

       List<Employee> employees =employeeEntities
               .stream()
               .map(emp -> new Employee(
                       emp.getId(),
                       emp.getFirstName(),
                       emp.getLastName(),
                       emp.getEmail()
               )).collect(Collectors.toList());
       return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        employeeRepository.delete(employeeEntity);
        return true;
    }

    @Override
    public Employee getEmployeeById(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity, employee);
        return employee;
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        employeeEntity.setFirstName(employee.getFirstName());
        employeeEntity.setLastName(employee.getLastName());
        employeeEntity.setEmail(employee.getEmail());
        employeeRepository.save(employeeEntity);
        return employee;
    }
}
