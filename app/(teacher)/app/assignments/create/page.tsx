'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconGripVertical,
} from '@tabler/icons-react'
import {
  Button,
} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/client'

// 🧱 SCHEMA -----------------------------------------------------------------

export const questionSchema = z.object({
  id: z.number(),
  order: z.number(),
  question: z.string(),
  responses: z.number(),
})

export const specSchema = z.object({
  id: z.number(),
  order: z.number(),
  specification: z.string(),
})

// 🧩 Komponen drag item untuk QUESTIONS ------------------------------------

function DraggableQuestion({
  question,
  onDelete,
}: {
  question: { id: number; order: number; question: string }
  onDelete: (id: number) => void
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: question.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-4 py-2 border rounded-md bg-background hover:bg-muted/40 transition-all ${
        isDragging ? 'opacity-80 shadow-md' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground"
        >
          <IconGripVertical className="size-4" />
        </Button>
        <span>Q{question.order}. {question.question}</span>
      </div>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => onDelete(question.id)}
      >
        Delete
      </Button>
    </div>
  )
}

// 🧩 Komponen drag item untuk SPECIFICATIONS -------------------------------

function DraggableSpec({
  spec,
  onDelete,
}: {
  spec: { id: number; order: number; specification: string }
  onDelete: (id: number) => void
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: spec.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-4 py-2 border rounded-md bg-background hover:bg-muted/40 transition-all ${
        isDragging ? 'opacity-80 shadow-md' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground"
        >
          <IconGripVertical className="size-4" />
        </Button>
        <span>S{spec.order}. {spec.specification}</span>
      </div>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => onDelete(spec.id)}
      >
        Delete
      </Button>
    </div>
  )
}




// 🧩 MAIN PAGE -------------------------------------------------------------

const Page = () => {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newSpec, setNewSpec] = useState('')
  const [data, setData] = useState<
    { id: number; order: number; question: string; responses: number }[]
  >([])
  const [specs, setSpecs] = useState<
    { id: number; order: number; specification: string }[]
  >([])

  // HELPER -----------------------------
  const authenticateAndSetUser = async (): Promise<string> => {
        try {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data?.user) {
                console.error("Authentication error:", error);
                return "";
            }

            const userId = data.user.id;

            return userId;
        } catch (err) {
            console.error("Auth error:", err);
            return "";
        }
    };

  useEffect(() => {
    const init = async () => {
      const userId = await authenticateAndSetUser();
      console.log("Authenticated user ID:");
      console.log(userId);
    };
    init();
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  // 🧩 FORM SETUP ----------------------------------------------------------
    const form = useForm({
    resolver: zodResolver(
        z.object({
        title: z.string().min(1, { message: 'Title is required' }),
        description: z.string().min(1, { message: 'Description is required' }),
        })
    ),
    defaultValues: {
        title: '',
        description: '',
    },
    })

  // 🧩 DRAG HANDLERS -------------------------------------------------------
  const handleDragEndQuestions = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setData((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      const reordered = arrayMove(items, oldIndex, newIndex)
      return reordered.map((item, index) => ({ ...item, order: index + 1 }))
    })
  }

  const handleDragEndSpecs = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setSpecs((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((i) => i.id === over.id)
      const reordered = arrayMove(items, oldIndex, newIndex)
      return reordered.map((item, index) => ({ ...item, order: index + 1 }))
    })
  }

  // 🧩 ADD / DELETE FUNCTIONS ---------------------------------------------
  const handleAddQuestion = (text: string) => {
    if (!text.trim()) return
    setData((prev) => [
      ...prev,
      {
        id: Date.now(),
        order: prev.length + 1,
        question: text,
        responses: 0,
      },
    ])
    setNewQuestion('')
  }

  const handleAddSpec = (text: string) => {
    if (!text.trim()) return
    setSpecs((prev) => [
      ...prev,
      { id: Date.now(), order: prev.length + 1, specification: text },
    ])
    setNewSpec('')
  }

  const handleDeleteQuestion = (id: number) => {
    setData((prev) =>
      prev
        .filter((q) => q.id !== id)
        .map((item, index) => ({ ...item, order: index + 1 }))
    )
  }

  const handleDeleteSpec = (id: number) => {
    setSpecs((prev) =>
      prev
        .filter((s) => s.id !== id)
        .map((item, index) => ({ ...item, order: index + 1 }))
    )
  }

  // 🧩 RENDER --------------------------------------------------------------
  return (
    <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
      <div className="flex flex-1 flex-col gap-6 overflow-auto p-6">
        <Card className="flex flex-1 flex-col">
          <CardHeader>
            <CardTitle>Assignment from Scratch</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 min-h-0">
            <Form {...form}>
              <form className="flex flex-col md:flex-row gap-6 w-full h-full">
                <div className="grid gap-6 w-full md:w-6/12 content-start">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter assignment title..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter assignment description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 🧩 Tabs Section */}
                <Tabs defaultValue="questions" className="w-full min-h-0">
                  <TabsList className="w-full">
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                    <TabsTrigger value="specifications">
                      Specifications
                    </TabsTrigger>
                  </TabsList>

                  {/* QUESTIONS */}
                  <TabsContent value="questions" className="grid min-h-20">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEndQuestions}
                    >
                      <SortableContext
                        items={data.map((i) => i.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="flex flex-col gap-2">
                          {data.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center border border-dashed p-4 rounded-md">
                              No questions added yet.
                            </p>
                          ) : (
                            data.map((q) => (
                              <DraggableQuestion
                                key={q.id}
                                question={q}
                                onDelete={handleDeleteQuestion}
                              />
                            ))
                          )}
                        </div>
                      </SortableContext>
                    </DndContext>

                    <div className="flex gap-2 w-full shrink-0 items-end mt-2">
                      <Input
                        type="text"
                        placeholder="Enter a new question"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddQuestion(newQuestion)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddQuestion(newQuestion)}
                      >
                        Add Question
                      </Button>
                    </div>
                  </TabsContent>

                  {/* SPECIFICATIONS */}
                  <TabsContent value="specifications" className="grid min-h-20">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEndSpecs}
                    >
                      <SortableContext
                        items={specs.map((i) => i.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="flex flex-col gap-2">
                          {specs.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center border border-dashed p-4 rounded-md">
                              No specifications added yet.
                            </p>
                          ) : (
                            specs.map((s) => (
                              <DraggableSpec
                                key={s.id}
                                spec={s}
                                onDelete={handleDeleteSpec}
                              />
                            ))
                          )}
                        </div>
                      </SortableContext>
                    </DndContext>

                    <div className="flex gap-2 w-full shrink-0 items-end mt-2">
                      <Input
                        type="text"
                        placeholder="Enter a new specification"
                        value={newSpec}
                        onChange={(e) => setNewSpec(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddSpec(newSpec)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddSpec(newSpec)}
                      >
                        Add Specification
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                'Create Assignment'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Page
