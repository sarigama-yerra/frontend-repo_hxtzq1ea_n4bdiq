import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Field({label, children}){
  return (
    <label className="block text-sm text-slate-300">
      <span className="block mb-1 text-slate-200">{label}</span>
      {children}
    </label>
  )
}

function Section({title, children}){
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-5">
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}

export function ClientForm({onCreated}){
  const [form, setForm] = useState({name:'', email:'', phone:'', notes:''})
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    await fetch(`${API}/api/clients`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    setLoading(false)
    setForm({name:'', email:'', phone:'', notes:''})
    onCreated?.()
  }

  return (
    <Section title="Add Client">
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Name"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></Field>
        <Field label="Email"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/></Field>
        <Field label="Phone"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/></Field>
        <div className="sm:col-span-2">
          <Field label="Notes"><textarea className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/></Field>
        </div>
        <div className="sm:col-span-2 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white" disabled={loading}>{loading? 'Saving...' : 'Save Client'}</button>
        </div>
      </form>
    </Section>
  )
}

export function ProjectForm({clients, onCreated}){
  const [form, setForm] = useState({name:'', client_id:'', hourly_rate:'', status:'active', notes:''})
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const payload = {...form, hourly_rate: form.hourly_rate? parseFloat(form.hourly_rate): undefined}
    await fetch(`${API}/api/projects`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setLoading(false)
    setForm({name:'', client_id:'', hourly_rate:'', status:'active', notes:''})
    onCreated?.()
  }

  return (
    <Section title="Add Project">
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Name"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></Field>
        <Field label="Client">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.client_id} onChange={e=>setForm({...form, client_id:e.target.value})}>
            <option value="">Unassigned</option>
            {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Hourly Rate ($)"><input type="number" step="0.01" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.hourly_rate} onChange={e=>setForm({...form, hourly_rate:e.target.value})}/></Field>
        <Field label="Status">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option>active</option>
            <option>planned</option>
            <option>paused</option>
            <option>completed</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes"><textarea className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/></Field>
        </div>
        <div className="sm:col-span-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white" disabled={loading}>{loading? 'Saving...' : 'Save Project'}</button>
        </div>
      </form>
    </Section>
  )
}

export function TimeLogForm({clients, projects, onCreated}){
  const [form, setForm] = useState({project_id:'', client_id:'', date:'', hours:'', description:'', hourly_rate:''})
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const payload = {...form, hours: parseFloat(form.hours), hourly_rate: form.hourly_rate? parseFloat(form.hourly_rate) : undefined}
    await fetch(`${API}/api/timelogs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setLoading(false)
    setForm({project_id:'', client_id:'', date:'', hours:'', description:'', hourly_rate:''})
    onCreated?.()
  }

  return (
    <Section title="Log Time">
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Project">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.project_id} onChange={e=>setForm({...form, project_id:e.target.value})} required>
            <option value="" disabled>Select</option>
            {projects.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>
        <Field label="Client">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.client_id} onChange={e=>setForm({...form, client_id:e.target.value})}>
            <option value="">Optional</option>
            {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Date"><input type="date" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></Field>
        <Field label="Hours"><input type="number" step="0.01" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.hours} onChange={e=>setForm({...form, hours:e.target.value})} required/></Field>
        <div className="sm:col-span-2">
          <Field label="Description"><textarea className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/></Field>
        </div>
        <Field label="Hourly Rate ($)"><input type="number" step="0.01" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.hourly_rate} onChange={e=>setForm({...form, hourly_rate:e.target.value})}/></Field>
        <div className="sm:col-span-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white" disabled={loading}>{loading? 'Saving...' : 'Add Entry'}</button>
        </div>
      </form>
    </Section>
  )
}

export function InvoiceForm({clients, projects, onCreated}){
  const [form, setForm] = useState({client_id:'', project_id:'', number:'', amount:'', due_date:'', status:'draft', notes:''})
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const payload = {...form, amount: parseFloat(form.amount) }
    await fetch(`${API}/api/invoices`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setLoading(false)
    setForm({client_id:'', project_id:'', number:'', amount:'', due_date:'', status:'draft', notes:''})
    onCreated?.()
  }

  return (
    <Section title="Create Invoice">
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Client">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.client_id} onChange={e=>setForm({...form, client_id:e.target.value})} required>
            <option value="" disabled>Select</option>
            {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Project">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.project_id} onChange={e=>setForm({...form, project_id:e.target.value})}>
            <option value="">Optional</option>
            {projects.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>
        <Field label="Invoice #"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.number} onChange={e=>setForm({...form, number:e.target.value})}/></Field>
        <Field label="Amount ($)"><input type="number" step="0.01" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required/></Field>
        <Field label="Due Date"><input type="date" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.due_date} onChange={e=>setForm({...form, due_date:e.target.value})}/></Field>
        <Field label="Status">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option>draft</option>
            <option>sent</option>
            <option>paid</option>
            <option>overdue</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes"><textarea className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/></Field>
        </div>
        <div className="sm:col-span-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white" disabled={loading}>{loading? 'Saving...' : 'Create Invoice'}</button>
        </div>
      </form>
    </Section>
  )
}

export function PaymentForm({clients, invoices, onCreated}){
  const [form, setForm] = useState({invoice_id:'', client_id:'', amount:'', method:'', date:'', notes:''})
  const [loading, setLoading] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const payload = {...form, amount: parseFloat(form.amount)}
    await fetch(`${API}/api/payments`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setLoading(false)
    setForm({invoice_id:'', client_id:'', amount:'', method:'', date:'', notes:''})
    onCreated?.()
  }

  return (
    <Section title="Record Payment">
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Invoice">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.invoice_id} onChange={e=>setForm({...form, invoice_id:e.target.value})}>
            <option value="">Unapplied</option>
            {invoices.map(inv=> <option key={inv.id} value={inv.id}>{inv.number || inv.id} - ${inv.amount}</option>)}
          </select>
        </Field>
        <Field label="Client">
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.client_id} onChange={e=>setForm({...form, client_id:e.target.value})}>
            <option value="">Optional</option>
            {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Amount ($)"><input type="number" step="0.01" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required/></Field>
        <Field label="Method"><input className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.method} onChange={e=>setForm({...form, method:e.target.value})}/></Field>
        <Field label="Date"><input type="date" className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></Field>
        <div className="sm:col-span-2">
          <Field label="Notes"><textarea className="w-full bg-slate-900/60 border border-slate-700 rounded-md px-3 py-2" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/></Field>
        </div>
        <div className="sm:col-span-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white" disabled={loading}>{loading? 'Saving...' : 'Record Payment'}</button>
        </div>
      </form>
    </Section>
  )
}
