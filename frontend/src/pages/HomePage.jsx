import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { jwtDecode } from 'jwt-decode'
import { Header } from '@/components/ui/header'

export const HomePage = () => {
    useEffect(() => {
        document.title = "KRSans"
    });

    const [user] = useAuth();

    const test = () => {
        console.log(jwtDecode(user.accessToken))
    }
    return (
        <Header>
            <div className="flex justify-center px-20">
            <Button onClick={test}> Hello </Button>
            </div>
        </Header>
    )
}