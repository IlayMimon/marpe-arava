import useGetShuttleRequests from "../hooks/data/useGetShuttleRequests"
import useGetShuttles from "../hooks/data/useGetShuttles"

export const useGetPatientStatus = () => {
const patients =  useGetShuttleRequests()
const shuttles = useGetShuttles()

console.log(patients)
}