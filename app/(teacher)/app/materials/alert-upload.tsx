import * as React from "react"
import { IconCloud } from "@tabler/icons-react"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";


export function AlertUploadContent(){

    const props = useSupabaseUpload({
    bucketName: 'materials',
    path: '/001',
    allowedMimeTypes: ['application/pdf'],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 5, // 10MB,
  })

 return (
    <AlertDialogContent>
    <AlertDialogHeader>
    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
    </AlertDialogDescription>
    <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
    </Dropzone>
    </AlertDialogHeader>
    <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>
 )   
}