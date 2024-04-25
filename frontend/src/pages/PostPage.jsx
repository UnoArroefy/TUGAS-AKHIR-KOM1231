import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle'

export const PostPage = () => {
    return (
        <div className="flex justify-center px-20">
        <Button> From Post </Button>
        <ModeToggle />
        </div>
    )
}