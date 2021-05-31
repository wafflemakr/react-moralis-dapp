import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Box,
  Table,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Tfoot,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useMoralisQuery, useMoralis } from "react-moralis";

export default function Dashboard() {
  const [limit, setLimit] = useState(10);
  const [tokenTransfers, setTokenTransfers] = useState([]);

  const { web3 } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "PolygonTokenTransfers",
    (query) => query.limit(limit),
    [limit],
    {
      live: "true",
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      const _transfers = data.map(({ attributes: att }) => {
        return {
          token: att.token_address,
          amount: web3.utils.fromWei(att.value),
          hash: att.transaction_hash,
        };
      });
      setTokenTransfers(_transfers);
    }
  }, [data, web3]);

  return (
    <Container maxW="xl" centerContent>
      <Heading>DASHBOARD PAGE</Heading>

      <Box mt={8}>
        {isLoading ? (
          "Loading..."
        ) : (
          <Table variant="striped" colorScheme="teal">
            <TableCaption>ERC20 token transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Token Address</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenTransfers.map((t, k) => (
                <Tr key={k}>
                  <Td>{t.token}</Td>
                  <Td>{t.amount}</Td>
                  <Td>
                    <Link
                      href={`https://explorer-mainnet.maticvigil.com/tx/${t.hash}`}
                      isExternal
                    >
                      {t.hash.substring(0, 8) +
                        "..." +
                        t.hash.substring(58, 66)}
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Token Address</Th>
                <Th>Amount</Th>
                <Th>Receipt</Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Box>
    </Container>
  );
}
