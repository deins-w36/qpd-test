import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '../../../types/User'

import PageWrapper from '../../Common/Wrappers/PageWrapper'

const UsersDetail = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    //Если был нормальный сервер, сделал бы запрос по id по типу '/users.json/1'
    //Но тут только так
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => {
        const user = data?.users?.find((user: User) => String(user.id) === id)
        setUser(user)
      })
      .catch((err) => {
        console.error('Ошибка загрузки данных:', err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>
  }

  if (error) {
    return <PageWrapper>Ops... Some error</PageWrapper>
  }

  return (
    <PageWrapper>
      <div className="text-xl text-center w-full">Информация сотрудника</div>
      {user && (
        <div className="card flex flex-row gap-4 justify-center items-start">
          <div className="w-72 h-72">
            <img
              src={
                user?.photo
                  ? `data:image/png;base64,${user?.photo}`
                  : `${process.env.PUBLIC_URL}/profile_placeholder.png`
              }
              alt="photoAvatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="info flex flex-col gap-4 justify-center items-start">
            <div>{`${user.lastName} ${user.firstName} ${user.middleName}`}</div>
            <div>Дата рождения: {new Date(user.birthDate).toLocaleString()}</div>
            <div>Департамент: {user.department}</div>
            <div>Должность: {user.post}</div>
            <div>Зарплата: {user.salary} p</div>
          </div>
        </div>
      )}
      {!user && <>Пользователь не найден</>}
    </PageWrapper>
  )
}

export default UsersDetail
