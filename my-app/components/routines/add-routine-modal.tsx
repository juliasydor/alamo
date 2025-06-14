"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoutineStore } from "@/store/routine-store";
import { useCreateRoutine } from "@/hooks/use-routines";
import type { CreateRoutineData } from "@/types/routine";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface FormData {
  time: string;
  name: string;
  details: string;
  cho: string;
  ptn: string;
  lip: string;
  unit: string;
  category: "morning" | "afternoon" | "evening";
}

export function AddRoutineModal() {
  const { isAddModalOpen, closeAddModal } = useRoutineStore();
  const createRoutineMutation = useCreateRoutine();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const category = watch("category");

  const onSubmit = async (data: FormData) => {
    try {
      const routineData: CreateRoutineData = {
        time: data.time,
        name: data.name,
        details: data.details
          .split("\n")
          .filter((detail) => detail.trim() !== ""),
        nutrients: {
          CHO: data.cho,
          PTN: data.ptn,
          LIP: data.lip,
        },
        unit: data.unit,
        category: data.category,
      };

      await createRoutineMutation.mutateAsync(routineData);
      reset();
      closeAddModal();
    } catch (error) {
      console.error("Failed to create routine:", error);
    }
  };

  const handleClose = () => {
    reset();
    closeAddModal();
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Routine</DialogTitle>
          <DialogDescription>
            Create a new routine with all the necessary details and
            specifications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                {...register("time", { required: "Time is required" })}
              />
              {errors.time && (
                <p className="text-sm text-destructive">
                  {errors.time.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Routine Name</Label>
            <Input
              id="name"
              placeholder="Enter routine name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Procedure Details</Label>
            <Textarea
              id="details"
              placeholder="Enter each detail on a new line"
              rows={4}
              {...register("details", { required: "Details are required" })}
            />
            {errors.details && (
              <p className="text-sm text-destructive">
                {errors.details.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cho">CHO</Label>
              <Input
                id="cho"
                placeholder="e.g., 26g"
                {...register("cho", { required: "CHO is required" })}
              />
              {errors.cho && (
                <p className="text-sm text-destructive">{errors.cho.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ptn">PTN</Label>
              <Input
                id="ptn"
                placeholder="e.g., 25g"
                {...register("ptn", { required: "PTN is required" })}
              />
              {errors.ptn && (
                <p className="text-sm text-destructive">{errors.ptn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lip">LIP</Label>
              <Input
                id="lip"
                placeholder="e.g., 1.3g"
                {...register("lip", { required: "LIP is required" })}
              />
              {errors.lip && (
                <p className="text-sm text-destructive">{errors.lip.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                placeholder="e.g., 215 mAU"
                {...register("unit", { required: "Unit is required" })}
              />
              {errors.unit && (
                <p className="text-sm text-destructive">
                  {errors.unit.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createRoutineMutation.isPending}>
              {createRoutineMutation.isPending && (
                <LoadingSpinner size="sm" className="mr-2" />
              )}
              Create Routine
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
