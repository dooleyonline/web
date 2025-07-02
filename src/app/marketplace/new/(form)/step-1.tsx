"use client";

import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  useFileUpload,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/api/marketplace";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ImageIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { FormReturnType } from "./schema";

type Step1Props = {
  form: FormReturnType;
  onSubmit: (values: unknown) => void;
};

export default function Step1(props: Step1Props) {
  const { form, onSubmit } = props;
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories({});

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  // Setup drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Add these state variables to your Step1 component
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<File | null>(null);

  // Handle the end of a drag operation
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveImage(null);

    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id.toString().replace("file-", ""));
      const newIndex = Number(over.id.toString().replace("file-", ""));

      const images = form.getValues("images");
      const reorderedImages = arrayMove(images, oldIndex, newIndex);
      form.setValue("images", reorderedImages, { shouldValidate: true });
    }
  };

  // Add a handleDragStart function
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const index = Number(active.id.toString().replace("file-", ""));
    setActiveId(active.id.toString());
    setActiveImage(form.getValues("images")[index]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 grow"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="e.g. Sony PlayStation 5 Digital Edition"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A descriptive name for your listing. Include brand and model if
                applicable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="e.g. Gently used, includes original box and accessories."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of the item. Include when you
                purchased it, any defects, and accessories included.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categoriesError && (
                        <SelectItem value="error" disabled>
                          Error loading categories
                        </SelectItem>
                      )}
                      {isCategoriesLoading && (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      )}
                      {categoriesData?.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a category that best fits your item. This helps
                    buyers find your listing easily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("category") === "" ? (
                        <SelectItem value="error" disabled>
                          Please select a category first
                        </SelectItem>
                      ) : (
                        categoriesData
                          ?.find(
                            (category) =>
                              category.name === form.watch("category")
                          )
                          ?.subcategories.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          )) || (
                          <SelectItem value="none" disabled>
                            No subcategories available
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a subcategory that best fits your item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropZoneConfig}
                  className="relative my-1"
                >
                  <FileInput
                    id="fileInput"
                    className="rounded-md outline-dashed outline-2 -outline-offset-2 outline-border"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <ImageIcon className="text-muted-foreground w-10 h-10" />
                      <p className="mb-1 text-sm text-muted-foreground font-semibold">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG, GIF, WEBP, SVG, HEIC, or HEIF
                      </p>
                    </div>
                  </FileInput>

                  {field.value.length > 0 && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      onDragStart={handleDragStart}
                    >
                      <SortableContext
                        items={field.value.map((_, i) => `file-${i}`)}
                        strategy={verticalListSortingStrategy}
                      >
                        <FileUploaderContent className="h-fit px-0 py-1 gap-0">
                          {field.value.map((image, i) => (
                            <SortableFileItem
                              key={`file-${i}`}
                              image={image}
                              index={i}
                            />
                          ))}
                        </FileUploaderContent>
                      </SortableContext>

                      <DragOverlay adjustScale={true} dropAnimation={null}>
                        {activeId && activeImage ? (
                          <FileUploaderItem
                            index={Number(activeId.replace("file-", ""))}
                            className="w-full h-fit border-primary shadow-md"
                          >
                            <Image
                              src={URL.createObjectURL(activeImage)}
                              alt="dragging"
                              width={40}
                              height={40}
                              className="object-cover rounded-sm overflow-hidden relative"
                            />
                            <span>{activeImage.name}</span>
                          </FileUploaderItem>
                        ) : null}
                      </DragOverlay>
                    </DndContext>
                  )}
                </FileUploader>
              </FormControl>
              <FormDescription>
                Upload up to 5 images of your item. Drag and drop to reorder.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 self-end grow items-end">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
}

const SortableFileItem = ({ image, index }: { image: File; index: number }) => {
  const { removeFileFromSet } = useFileUpload();

  const { attributes, listeners, setNodeRef } = useSortable({
    id: `file-${index}`,
  });

  return (
    <div className="relative">
      <FileUploaderItem
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        index={index}
        className="h-fit cursor-grab bg-background hover:bg-accent rounded-sm"
      >
        <Image
          src={URL.createObjectURL(image)}
          alt="image"
          width={40}
          height={40}
          className="object-cover rounded-sm overflow-hidden relative"
        />
        <span>{image.name}</span>
      </FileUploaderItem>
      <Button
        variant="ghost"
        onClick={() => removeFileFromSet(index)}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};
