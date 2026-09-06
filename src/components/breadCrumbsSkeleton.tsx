import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Skeleton } from "./ui/skeleton";

const BreadCrumbsSkeleton = () => {
  return (
    <Breadcrumb className="my-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-12" />
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <Skeleton className="h-4 w-20" />
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <Skeleton className="h-4 w-28" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbsSkeleton;