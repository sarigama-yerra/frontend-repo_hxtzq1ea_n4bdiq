import React, { useEffect, useMemo, useState } from 'react'
import DashboardCards from './components/DashboardCards'
import { ClientForm, ProjectForm, TimeLogForm, InvoiceForm, PaymentForm } from './components/Forms'
import { ClientList, ProjectList, TimeLogList, InvoiceList, PaymentList } from './components/Lists'

const API = import.meta.env.VITE_BACKEND_URL || ''

function useFetch(url, deps=[]) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{
    let cancelled = false
    setLoading(true)
    fetch(url)
      .then(r=> r.json())
      .then(d=> { if(!cancelled){ setData(d); setLoading(false)} })
      .catch(e=> { if(!cancelled){ setError(e); setLoading(false)} })
    return ()=>{ cancelled = true }
  }, deps)
  return {data, loading, error, refetch: ()=> setData(null)}
}

export default function App(){
  const [refreshKey, setRefreshKey] = useState(0)
  const bump = ()=> setRefreshKey(k=>k+1)

  const metrics = useFetch(`${API}/api/metrics?key=${refreshKey}`, [refreshKey])
  const clients = useFetch(`${API}/api/clients?key=${refreshKey}`, [refreshKey])
  const projects = useFetch(`${API}/api/projects?key=${refreshKey}`, [refreshKey])
  const timelogs = useFetch(`${API}/api/timelogs?key=${refreshKey}`, [refreshKey])
  const invoices = useFetch(`${API}/api/invoices?key=${refreshKey}`, [refreshKey])
  const payments = useFetch(`${API}/api/payments?key=${refreshKey}`, [refreshKey])

  const clientsById = useMemo(()=> Object.fromEntries((clients.data||[]).map(c=>[c.id, c])), [clients.data])
  const projectsById = useMemo(()=> Object.fromEntries((projects.data||[]).map(p=>[p.id, p])), [projects.data])
  const invoicesById = useMemo(()=> Object.fromEntries((invoices.data||[]).map(i=>[i.id, i])), [invoices.data])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800/60 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600"></div>
            <h1 className="text-lg font-semibold">Freelancer Manager</h1>
          </div>
          <button onClick={bump} className="px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700">Refresh</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section>
          <DashboardCards metrics={metrics.data || {}} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ClientForm onCreated={bump} />
            <ProjectForm clients={clients.data || []} onCreated={bump} />
            <TimeLogForm clients={clients.data || []} projects={projects.data || []} onCreated={bump} />
          </div>
          <div className="space-y-6">
            <InvoiceForm clients={clients.data || []} projects={projects.data || []} onCreated={bump} />
            <PaymentForm clients={clients.data || []} invoices={invoices.data || []} onCreated={bump} />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Clients</h2>
            <ClientList items={clients.data || []} />

            <h2 className="text-xl font-semibold">Projects</h2>
            <ProjectList items={projects.data || []} clientsById={clientsById} />

            <h2 className="text-xl font-semibold">Time Logs</h2>
            <TimeLogList items={timelogs.data || []} projectsById={projectsById} />
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Invoices</h2>
            <InvoiceList items={invoices.data || []} clientsById={clientsById} />

            <h2 className="text-xl font-semibold">Payments</h2>
            <PaymentList items={payments.data || []} invoicesById={invoicesById} />
          </div>
        </section>
      </main>
    </div>
  )
}
