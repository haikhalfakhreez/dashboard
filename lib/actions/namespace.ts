"use server"

import { cache } from "react"
import { revalidatePath } from "next/cache"
import { Namespace, Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

type ActionResponse<TData> =
  | {
      success: true
      data: TData
    }
  | {
      success: false
      message: string
    }

export const createNamespace = cache(
  async (name: string): Promise<ActionResponse<Namespace>> => {
    try {
      const namespace = await prisma.namespace.create({
        data: {
          name,
        },
      })
      revalidatePath("/translations")
      return {
        success: true,
        data: namespace,
      }
    } catch (error) {
      console.error(error)

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return {
          success: false,
          message:
            "A namespace with the same name already exists. Please choose another name.",
        }
      }

      return {
        success: false,
        message: "Something went wrong. Please check the console for details.",
      }
    }
  }
)

export const deleteNamespace = cache(
  async (id: number): Promise<ActionResponse<Namespace>> => {
    try {
      const namespace = await prisma.$transaction(async (tx) => {
        await tx.translation.deleteMany({
          where: {
            namespaceId: id,
          },
        })

        return await tx.namespace.delete({
          where: {
            id,
          },
        })
      })

      revalidatePath("/translations")
      return {
        success: true,
        data: namespace,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
        message: "Something went wrong. Please check the console for details.",
      }
    }
  }
)
