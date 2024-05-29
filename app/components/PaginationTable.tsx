"use client"

import React, { useState } from 'react'
import { Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const PaginationTable = ({ itemCount, pageSize, currentPage }: Props) => {

  const totalPages = Math.ceil(itemCount / pageSize)
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push("?" + params.toString())
  }

  return (
    <div className='mt-4'>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  )
}

export default PaginationTable