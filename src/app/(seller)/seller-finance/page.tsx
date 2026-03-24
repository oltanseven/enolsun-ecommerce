export default function SellerFinancePage() {
  const transactions = [
    { id: "TXN-001", type: "Satis", order: "#ENS-10247", amount: "+485,00", date: "23 Mar 2026", status: "Tamamlandi", statusClass: "bg-success-light text-success-dark" },
    { id: "TXN-002", type: "Satis", order: "#ENS-10246", amount: "+1.250,00", date: "23 Mar 2026", status: "Beklemede", statusClass: "bg-warning-light text-warning-dark" },
    { id: "TXN-003", type: "Komisyon", order: "#ENS-10244", amount: "-89,00", date: "22 Mar 2026", status: "Tamamlandi", statusClass: "bg-success-light text-success-dark" },
    { id: "TXN-004", type: "Odeme", order: "—", amount: "-8.500,00", date: "20 Mar 2026", status: "Tamamlandi", statusClass: "bg-success-light text-success-dark" },
    { id: "TXN-005", type: "Iade", order: "#ENS-10238", amount: "-720,00", date: "20 Mar 2026", status: "Tamamlandi", statusClass: "bg-error-light text-error-dark" },
  ]

  const commissions = [
    { category: "Ev & Yasam", rate: "%10", sales: "45.200", commission: "4.520" },
    { category: "Aydinlatma", rate: "%8", sales: "32.800", commission: "2.624" },
    { category: "Dekorasyon", rate: "%10", sales: "18.600", commission: "1.860" },
  ]

  const monthlyData = [
    { month: "Oca", value: "32K", height: "45%" },
    { month: "Sub", value: "28K", height: "39%" },
    { month: "Mar", value: "42K", height: "58%" },
    { month: "Nis", value: "55K", height: "76%" },
    { month: "May", value: "48K", height: "67%" },
    { month: "Haz", value: "62K", height: "86%" },
    { month: "Tem", value: "72K", height: "100%" },
    { month: "Agu", value: "58K", height: "81%" },
    { month: "Eyl", value: "65K", height: "90%" },
    { month: "Eki", value: "70K", height: "97%" },
    { month: "Kas", value: "52K", height: "72%" },
    { month: "Ara", value: "68K", height: "94%" },
  ]

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Finans</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 shadow-align-xs transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Rapor Indir
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;24.850</p>
          <p className="text-sm text-neutral-500 mt-1">Mevcut Bakiye</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;8.200</p>
          <p className="text-sm text-neutral-500 mt-1">Bekleyen Odeme</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100">
          <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-success-dark" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M7 17l5-5 5 5M7 7l5-5 5 5"/></svg>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;186.400</p>
          <p className="text-sm text-neutral-500 mt-1">Toplam Gelir (Yil)</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-align-xs border border-neutral-100">
          <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-warning-dark" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>
          </div>
          <p className="text-2xl font-bold text-neutral-900">&#8378;9.004</p>
          <p className="text-sm text-neutral-500 mt-1">Toplam Komisyon</p>
        </div>
      </div>

      {/* Payment Info + Monthly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Payment Info */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Odeme Bilgileri</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Banka</span>
              <span className="text-sm font-medium text-neutral-900">Garanti BBVA</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">IBAN</span>
              <span className="text-sm font-medium text-neutral-900 font-mono">TR** **** **** **** **** 4521</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Odeme Periyodu</span>
              <span className="text-sm font-medium text-neutral-900">Haftalik</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-neutral-500">Sonraki Odeme</span>
              <span className="text-sm font-semibold text-primary-600">27 Mar 2026</span>
            </div>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-align-xs border border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Aylik Gelir</h2>
          <div className="flex items-end justify-between gap-1 h-44">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-neutral-500 font-medium">&#8378;{d.value}</span>
                <div className="chart-bar w-full bg-primary-400 rounded-t-md" style={{ height: d.height }}></div>
                <span className="text-[10px] text-neutral-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-align-xs border border-neutral-100 mb-8 overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900">Son Islemler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-25">
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Islem No</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tur</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Siparis</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tutar</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tarih</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-neutral-25 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-neutral-700">{t.id}</td>
                  <td className="px-5 py-4 text-sm text-neutral-600">{t.type}</td>
                  <td className="px-5 py-4 text-sm text-primary-600 font-medium">{t.order}</td>
                  <td className={`px-5 py-4 text-sm font-semibold ${t.amount.startsWith("+") ? "text-success-dark" : "text-error-dark"}`}>&#8378;{t.amount}</td>
                  <td className="px-5 py-4 text-sm text-neutral-500">{t.date}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${t.statusClass}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-white rounded-2xl shadow-align-xs border border-neutral-100 overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900">Komisyon Detaylari</h2>
          <p className="text-sm text-neutral-500 mt-0.5">Kategoriye gore komisyon oranlari ve tutarlari</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-25">
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Oran</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Satis Tutari</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Komisyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {commissions.map(c => (
                <tr key={c.category} className="hover:bg-neutral-25 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-neutral-700">{c.category}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary-600">{c.rate}</td>
                  <td className="px-5 py-4 text-sm text-neutral-800">&#8378;{c.sales}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-error-dark">&#8378;{c.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
