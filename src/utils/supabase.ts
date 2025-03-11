
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for payment notifications
export const createPaymentNotification = async (paymentData: {
  payment_type: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  transaction_id: string;
  user_id?: string;
  details?: any;
}) => {
  try {
    const { data, error } = await supabase
      .from('payment_notifications')
      .insert([{
        ...paymentData,
        timestamp: new Date().toISOString(),
      }])
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating payment notification:', error);
    return { data: null, error };
  }
};

// Function to verify deposits
export const verifyDeposit = async (transactionId: string, verified: boolean) => {
  try {
    const { data, error } = await supabase
      .from('payment_notifications')
      .update({ 
        status: verified ? 'verified' : 'rejected',
        verified_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error verifying deposit:', error);
    return { data: null, error };
  }
};
