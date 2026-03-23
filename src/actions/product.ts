'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(id: string) {
  try {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
      return { error: 'Unauthorized. Admin role required.' };
    }

    if (!id) {
      return { error: 'Product ID is required.' };
    }

    console.log(`🗑️ Deleting product: ${id}`);

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
    
    return { success: true };
  } catch (error: any) {
    console.error('❌ Server Action Delete Error:', error);
    return { error: error.message || 'Failed to delete product from database.' };
  }
}
