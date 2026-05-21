const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nkxkciqgklvxuwkfzetf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rs_9TBx3FFBZlDmxWK3JtQ_-Y9_izmJ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkOrders() {
    console.log('Fetching last 10 orders from Supabase...');
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error fetching orders:', error.message);
    } else {
        console.log('Latest 10 orders:');
        console.log(JSON.stringify(data, null, 2));
    }
}

checkOrders();
