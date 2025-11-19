import React from 'react'

const Pill = ({children, color}) => (
  <span className={`px-2 py-0.5 rounded-full text-xs ${color}`}>{children}</span>
)

export function ClientList({items}){
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-300">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Phone</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {items.map(c=> (
            <tr key={c.id} className="hover:bg-slate-800/40">
              <td className="p-3 text-white">{c.name}</td>
              <td className="p-3 text-slate-300">{c.email || '-'}</td>
              <td className="p-3 text-slate-300">{c.phone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ProjectList({items, clientsById}){
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-300">
          <tr>
            <th className="text-left p-3">Project</th>
            <th className="text-left p-3">Client</th>
            <th className="text-left p-3">Rate</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {items.map(p=> (
            <tr key={p.id} className="hover:bg-slate-800/40">
              <td className="p-3 text-white">{p.name}</td>
              <td className="p-3 text-slate-300">{clientsById[p.client_id]?.name || '-'}</td>
              <td className="p-3 text-slate-300">{p.hourly_rate? `$${p.hourly_rate}` : '-'}</td>
              <td className="p-3"><Pill color="bg-blue-500/20 text-blue-300 border border-blue-400/30">{p.status}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TimeLogList({items, projectsById}){
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-300">
          <tr>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Project</th>
            <th className="text-left p-3">Hours</th>
            <th className="text-left p-3">Rate</th>
            <th className="text-left p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {items.map(t=> (
            <tr key={t.id} className="hover:bg-slate-800/40">
              <td className="p-3 text-white">{t.date}</td>
              <td className="p-3 text-slate-300">{projectsById[t.project_id]?.name || '-'}</td>
              <td className="p-3 text-slate-300">{t.hours}</td>
              <td className="p-3 text-slate-300">{t.hourly_rate? `$${t.hourly_rate}` : '-'}</td>
              <td className="p-3 text-slate-300">{t.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function InvoiceList({items, clientsById}){
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-300">
          <tr>
            <th className="text-left p-3">Invoice #</th>
            <th className="text-left p-3">Client</th>
            <th className="text-left p-3">Amount</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {items.map(inv=> (
            <tr key={inv.id} className="hover:bg-slate-800/40">
              <td className="p-3 text-white">{inv.number || inv.id.slice(-6)}</td>
              <td className="p-3 text-slate-300">{clientsById[inv.client_id]?.name || '-'}</td>
              <td className="p-3 text-slate-300">${inv.amount?.toFixed? inv.amount.toFixed(2): inv.amount}</td>
              <td className="p-3"><Pill color="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">{inv.status}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PaymentList({items, invoicesById}){
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/70 text-slate-300">
          <tr>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Invoice</th>
            <th className="text-left p-3">Amount</th>
            <th className="text-left p-3">Method</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {items.map(p=> (
            <tr key={p.id} className="hover:bg-slate-800/40">
              <td className="p-3 text-white">{p.date}</td>
              <td className="p-3 text-slate-300">{invoicesById[p.invoice_id]?.number || '-'}</td>
              <td className="p-3 text-slate-300">${p.amount?.toFixed? p.amount.toFixed(2): p.amount}</td>
              <td className="p-3 text-slate-300">{p.method || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
