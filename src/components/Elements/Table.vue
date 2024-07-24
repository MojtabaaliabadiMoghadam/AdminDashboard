<template>
  <!-- Table responsive wrapper -->
  <div class="overflow-x-auto bg-white">

    <!-- Search input -->
    <div class="relative m-[2px] mb-3 mr-5 float-left">
      <label for="inputSearch" class="sr-only">Search </label>
      <input id="inputSearch" type="text" placeholder="Search..." class="block w-64 rounded-lg border py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-neutral-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </span>
    </div>

    <!-- Filter -->
    <div class="relative m-[2px] mb-3 float-right hidden sm:block">
      <label for="inputFilter" class="sr-only">Filter</label>
      <select id="inputFilter" class="block w-40 rounded-lg border p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400">
        <option value="1" selected>Last week</option>
        <option value="2">Last month</option>
        <option value="3">Yesterday</option>
        <option value="4">Last 7 days</option>
        <option value="5">Last 30 days</option>
      </select>
    </div>

    <!-- Table -->
    <table class="min-w-full text-left text-sm whitespace-nowrap">

      <!-- Table head -->
      <thead class="uppercase tracking-wider border-b-2  border-t">
      <tr>
        <th scope="col" class="px-6 py-4 border-x">
          Product
        </th>
        <th scope="col" class="px-6 py-4 border-x">
          Price
        </th>
        <th scope="col" class="px-6 py-4 border-x">
          Stock
        </th>
        <th scope="col" class="px-6 py-4 border-x">
          Status
        </th>
      </tr>
      </thead>

      <!-- Table body -->
      <tbody>

      <tr class="border-b  hover:bg-neutral-100">
        <th scope="row" class="px-6 py-4 border-x">
          Handbag
        </th>
        <td class="px-6 py-4 border-x ">$129.99</td>
        <td class="px-6 py-4 border-x ">30</td>
        <td class="px-6 py-4 border-x ">In Stock</td>
      </tr>

      <tr class="border-b  hover:bg-neutral-100">
        <th scope="row" class="px-6 py-4 border-x ">
          Shoes
        </th>
        <td class="px-6 py-4 border-x ">$89.50</td>
        <td class="px-6 py-4 border-x ">25</td>
        <td class="px-6 py-4 border-x ">In Stock</td>
      </tr>

      <tr class="border-b  hover:bg-neutral-100">
        <th scope="row" class="px-6 py-4 border-x ">
          Bedding Set
        </th>
        <td class="px-6 py-4 border-x ">$69.99</td>
        <td class="px-6 py-4 border-x ">40</td>
        <td class="px-6 py-4 border-x ">In Stock</td>
      </tr>

      <tr class="border-b  hover:bg-neutral-100">
        <th scope="row" class="px-6 py-4 border-x ">
          Dining Table
        </th>
        <td class="px-6 py-4 border-x ">$449.99</td>
        <td class="px-6 py-4 border-x ">5</td>
        <td class="px-6 py-4 border-x ">In Stock</td>
      </tr>

      <tr class="border-b  hover:bg-neutral-100">
        <th scope="row" class="px-6 py-4 border-x ">
          Soap Set
        </th>
        <td class="px-6 py-4 border-x ">$24.95</td>
        <td class="px-6 py-4 border-x ">50</td>
        <td class="px-6 py-4 border-x ">In Stock</td>
      </tr>

      </tbody>

    </table>

    <nav class="mt-5 flex items-center justify-between text-sm" aria-label="Page navigation example">
      <p>
        Showing <strong>1-5</strong> of <strong>10</strong>
      </p>

      <ul class="list-style-none flex">
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="#!"
          >
            Previous
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="#!"
          >
            1
          </a>
        </li>
        <li aria-current="page">
          <a
              class="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
              href="#!"
          >
            2
            <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            (current)
          </span>
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="#!"
          >
            3
          </a>
        </li>
        <li>
          <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
              href="#!"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>