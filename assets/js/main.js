;(async function () {
  const summaryData = await fetch('/data.json').then((data) => data.json())

  const summaryListElement = document.getElementById('summary-list')

  const bgVariants = {
    Reaction: 'bg-light-red/5',
    Memory: 'bg-orange-yellow/5',
    Verbal: 'bg-green-teal/5',
    Visual: 'bg-violet-blue/5',
  }

  const textColorVariants = {
    Reaction: 'text-light-red',
    Memory: 'text-orange-yellow',
    Verbal: 'text-green-teal',
    Visual: 'text-violet-blue',
  }

  summaryData.forEach((item) => {
    const li = document.createElement('li')

    li.classList.add(
      ...`flex w-full items-center rounded-md ${
        bgVariants[item.category]
      } p-4 ${
        textColorVariants[item.category]
      } before:mr-3 before:leading-[0] before:content-[url('${item.icon.slice(
        1,
      )}')] md:leading-6`.split(' '),
    )

    li.innerHTML = `
      ${item.category}
      <span class="ml-auto text-dark-gray-blue/50">
        <span class="font-bold text-dark-gray-blue">${item.score}</span> / 100
      </span>`
    summaryListElement.appendChild(li)
  })
})()
