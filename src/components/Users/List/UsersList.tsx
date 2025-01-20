import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

import { User } from '../../../types/User'
import PageWrapper from '../../Common/Wrappers/PageWrapper'

const { Search } = Input

const columns: ColumnsType<User> = [
  {
    title: '#',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: 'Ф.И.О.',
    dataIndex: 'fullName',
    render: (_, record: User) => `${record.lastName} ${record.firstName} ${record.middleName}`,
    width: 400,
  },
  {
    title: 'Департамент',
    dataIndex: 'department',
    width: 250,
  },
  {
    title: 'Должность',
    dataIndex: 'post',
    width: 250,
  },
]

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const navigate = useNavigate()

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const lowercasedValue = event.target.value
    setFilteredUsers(
      users.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(lowercasedValue) ||
          employee.lastName.toLowerCase().includes(lowercasedValue) ||
          employee.middleName.toLowerCase().includes(lowercasedValue)
        )
      }),
    )
  }

  const handleRowClick = (record: User) => navigate(`/users/${record.id}`)

  useEffect(() => {
    setLoading(true)
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
        setFilteredUsers(data.users)
      })
      .catch((err) => {
        setError(err)
        console.error('Ошибка загрузки данных:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>
  }

  if (error) {
    return <PageWrapper>Ops... Some error</PageWrapper>
  }

  return (
    <PageWrapper>
      <>
        <Search
          placeholder="Введите имя, фамилию или отчество"
          allowClear
          size="large"
          onChange={onSearch}
          className="max-w-screen-lg"
        />
        {!!users?.length && (
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 8, className: '!justify-center' }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowClassName="cursor-pointer"
          />
        )}
        {!users?.length && <>Пользователей нет</>}
      </>
    </PageWrapper>
  )
}

export default UsersList
