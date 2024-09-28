import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSubreddit } from "@/lib/subreddit";
import React, { useRef, useState } from "react";

export function CreateCommunity() {
  const { token } = useAuth();
  const [communityName, setCommunityName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );
  const descriptionRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedName = e.target.value.replace(/\s/g, "");
    if (trimmedName && errors.name) {
      errors.name = "";
    }
    setCommunityName(trimmedName);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && errors.description) {
      errors.description = "";
    }
    setDescription(e.target.value);
  };

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};
    if (!communityName) {
      newErrors.name = "Community name is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      if (!token) {
        return;
      }
      createSubreddit({ name: communityName, description }, token);
      setIsDialogOpen(false);
    } else {
      if (formErrors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (formErrors.description && descriptionRef.current) {
        descriptionRef.current.focus();
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white">
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Community</DialogTitle>
            <DialogDescription>Create a new Community here</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-white">
                Name
              </Label>
              <Input
                id="name"
                ref={nameRef}
                className="col-span-3 bg-gray-800 text-white"
                onChange={handleNameChange}
                value={communityName}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <span className="text-red-500 col-span-3">{errors.name}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-white">
                Description
              </Label>
              <Input
                id="description"
                ref={descriptionRef}
                className="col-span-3 bg-gray-800 text-white"
                onChange={handleDescriptionChange}
                value={description}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <span className="text-red-500 col-span-3">
                  {errors.description}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
