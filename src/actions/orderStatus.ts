'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(id: string, status: string, deliveryEstimate?: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: { 
        status,
        deliveryEstimate
      }
    });
    
    revalidatePath('/admin/orders');
    revalidatePath('/orders');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update order status:', error);
    return { error: 'Failed to update order.' };
  }
}
