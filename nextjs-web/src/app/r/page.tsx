"use client";
import { redirect, RedirectType } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  useEffect(() => {
    redirect("/", RedirectType.replace);
  }, []);
  return null;
};

export default page;
