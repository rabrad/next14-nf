'use server'

import { getServerSession } from 'next-auth'
import prisma from './db'
import { authOptions } from './auth'
import { revalidatePath } from 'next/cache'

export async function addToWatchList(formData: FormData ) {
    'use server'
    
    // Get the userId from nextAuth
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email as string

    // Get movieId from the form
    const movieId = formData.get('movieId')

    // The suggested solution is to add "pathname" to the formData and pass it into revalidatePath()
    const pathname = formData.get('pathname') as string

    const data = await prisma.watchList.create({
        data: {
            userId: userId,
            movieId: Number(movieId) // Expecting a number but it is string in formData
        }
    })
    // revalidatePath("/*") // A possible solution to revalidate client actions via server action
    revalidatePath(pathname)
}

export async function deleteFromWatchList(formData: FormData){
    'use server'
    const watchListsId = formData.get('watchListsId') as string
    const pathname = formData.get('pathname') as string

const data = await prisma.watchList.delete({
    where: {
        id:  watchListsId
    }

})
revalidatePath(pathname) 
}