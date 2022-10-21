import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import * as _ from 'lodash'

type CheckType = {
 [key: string]: boolean
}

function useChecks(data: CheckType) {
 const [checkboxes, setCheckboxes] = useState<CheckType>(data)
 const [isAllChecked, setIsAllChecked] = useState(_.values(checkboxes).every((checked) => checked))

 const handleChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  const { id, checked } = e.target

  setCheckboxes((prev) => {
   const newData = { ...prev, [id]: checked }

   setIsAllChecked(_.values(newData).every((checked) => checked))
   return newData
  })
 }, [])

 const handleAllChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  const { checked } = e.target

  setCheckboxes((prev) => {
   const newData = Object.keys(prev).reduce((previousValue, key) => ({ ...previousValue, [key]: checked }), {
    ...prev,
   })

   return newData
  })
  setIsAllChecked(checked)
 }, [])

 const handleSetChecked = useCallback((data: CheckType) => {
  setCheckboxes(data)
  setIsAllChecked(_.values(data).every((checked) => checked))
 }, [])

 const flatIds = useMemo(() => Object.keys(checkboxes), [checkboxes])

 return {
  checkboxes,
  isAllChecked,
  flatIds,
  handleChecked,
  handleAllChecked,
  handleSetChecked,
 }
}

export default useChecks
